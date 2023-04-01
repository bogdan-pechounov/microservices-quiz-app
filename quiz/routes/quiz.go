package routes

import (
	"errors"
	"fmt"
	"net/http"
	"quiz/database"
	"quiz/middleware"
	"quiz/models"

	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"
)

// Create a quiz
func CreateQuiz(c *fiber.Ctx) error {
	// get user
	user, ok := c.Locals("user").(middleware.User)

	if !ok {
		return c.SendStatus(http.StatusInternalServerError)
	}

	// parse request
	var quiz models.Quiz

	fmt.Println(1, quiz)

	if err := c.BodyParser(&quiz); err != nil {
		return c.Status(400).JSON(err.Error())
	}

	fmt.Println(2, quiz)

	// set user fields
	quiz.UserID = user.ID

	// create quiz
	database.Instance.Create(&quiz)

	fmt.Println(3, quiz)
	return c.Status(http.StatusCreated).JSON(quiz)
}

// Get all quizzes
func GetQuizzes(c *fiber.Ctx) error {
	quizzes := []models.Quiz{}

	// preload questions TODO preload optional
	database.Instance.Preload("Questions").Find(&quizzes)

	return c.Status(http.StatusOK).JSON(quizzes)
}

// helper function to find quiz by id
func findQuiz(id int, quiz *models.Quiz) error {
	database.Instance.Find(&quiz, "id = ?", id)
	if quiz.ID == 0 {
		return errors.New("quiz does not exist")
	}
	return nil
}

func findPreloadedQuiz(id int, quiz *models.Quiz) error {
	database.Instance.Preload("Questions").Preload("Questions.Answers").Find(&quiz, "id = ?", id)
	if quiz.ID == 0 {
		return errors.New("quiz does not exist")
	}
	return nil
}

// get a quiz by id
func GetQuiz(c *fiber.Ctx) error {
	// parse id
	id, err := c.ParamsInt("id")

	if err != nil {
		return c.Status(http.StatusBadRequest).JSON("Please make sure that :id is an integer")
	}

	// find by id
	var quiz models.Quiz

	if err := findPreloadedQuiz(id, &quiz); err != nil {
		return c.Status(http.StatusBadRequest).JSON(err.Error())
	}

	return c.Status(http.StatusOK).JSON(quiz)
}

// update a quiz
func UpdateQuiz(c *fiber.Ctx) error {
	// parse id
	id, err := c.ParamsInt("id")

	if err != nil {
		return c.Status(http.StatusBadRequest).JSON("Please make sure that :id is an integer")
	}

	// find quiz
	var quiz models.Quiz

	if err := findQuiz(id, &quiz); err != nil {
		return c.Status(http.StatusBadRequest).JSON(err.Error())
	}

	// check if author
	if ok := isAuthor(c, &quiz); !ok {
		return nil
	}

	if err := c.BodyParser(&quiz); err != nil {
		return c.Status(http.StatusInternalServerError).JSON(err.Error())
	}

	// save
	database.Instance.Omit("Questions").Updates(&quiz)
	// replace questions
	database.Instance.Session(&gorm.Session{FullSaveAssociations: true}).Model(&quiz).Association("Questions").Replace(&quiz.Questions)

	return c.Status(http.StatusOK).JSON(quiz)
}

// compare ids of user and quiz.user
func isAuthor(c *fiber.Ctx, quiz *models.Quiz) bool {
	// get user
	user, ok := c.Locals("user").(middleware.User)

	if !ok {
		c.SendStatus(http.StatusInternalServerError)
		return false
	}

	// compare ids
	if user.ID != quiz.UserID {
		c.Status(http.StatusForbidden).SendString("Not authorized")
		return false
	}

	return true
}

// delete a quiz
func DeleteQuiz(c *fiber.Ctx) error {
	// parse id
	id, err := c.ParamsInt("id")

	if err != nil {
		return c.Status(http.StatusBadRequest).JSON("Please make sure that :id is an integer")
	}

	// check if quiz exists
	var quiz models.Quiz

	if err := findQuiz(id, &quiz); err != nil {
		return c.Status(http.StatusBadRequest).JSON(err.Error())
	}

	// check if author
	if ok := isAuthor(c, &quiz); !ok {
		return nil
	}

	// delete using primary key
	if err := database.Instance.Delete(quiz).Error; err != nil {
		return c.Status(http.StatusInternalServerError).JSON(err.Error())
	}

	return c.Status(http.StatusOK).SendString("Quiz deleted")
}
