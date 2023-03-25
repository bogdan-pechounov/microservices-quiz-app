package routes

import (
	"errors"
	"fmt"
	"net/http"
	"quiz/database"
	"quiz/middleware"
	"quiz/models"

	"github.com/gofiber/fiber/v2"
)

// Create a quiz
func CreateQuiz(c *fiber.Ctx) error {
	// get user
	user, ok := c.Locals("user").(middleware.User)

	if !ok {
		// TODO how to handle it
		return c.Status(http.StatusInternalServerError).SendString("No user")
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
	quiz.Author = user.Username

	// create quiz
	database.Instance.Create(&quiz)

	fmt.Println(3, quiz)
	return c.Status(http.StatusCreated).JSON(quiz)
}

// Get all quizzes
func GetQuizzes(c *fiber.Ctx) error {
	quizzes := []models.Quiz{}

	// preload questions
	database.Instance.Preload("Questions").Find(&quizzes)

	return c.Status(http.StatusOK).JSON(quizzes)
}

func findQuiz(id int, quiz *models.Quiz) error {
	database.Instance.Find(&quiz, "id = ?", id)
	if quiz.ID == 0 {
		return errors.New("quiz does not exist")
	}
	return nil
}

func GetQuiz(c *fiber.Ctx) error {
	// parse id
	id, err := c.ParamsInt("id")

	if err != nil {
		return c.Status(http.StatusBadRequest).JSON("Please ensuure that :id is an integer")
	}

	// find by id
	var quiz models.Quiz

	if err := findQuiz(id, &quiz); err != nil {
		return c.Status(http.StatusBadRequest).JSON(err.Error())
	}

	return c.Status(http.StatusOK).JSON(quiz)
}

func UpdateQuiz(c *fiber.Ctx) error {
	id, err := c.ParamsInt("id")

	if err != nil {
		return c.Status(http.StatusBadRequest).JSON("Please ensuure that :id is an integer")
	}

	var quiz models.Quiz

	if err := findQuiz(id, &quiz); err != nil {
		return c.Status(http.StatusBadRequest).JSON(err.Error())
	}

	if err := c.BodyParser(&quiz); err != nil {
		return c.Status(http.StatusInternalServerError).JSON(err.Error())
	}

	// save
	database.Instance.Save(&quiz)
	return c.Status(http.StatusOK).JSON(quiz)
}

func DeleteQuiz(c *fiber.Ctx) error {
	fmt.Println("DELETE")
	id, err := c.ParamsInt("id")

	if err != nil {
		return c.Status(http.StatusBadRequest).JSON("Please ensuure that :id is an integer")
	}

	var quiz models.Quiz

	fmt.Println(quiz)

	if err := findQuiz(id, &quiz); err != nil {
		return c.Status(http.StatusNotFound).JSON(err.Error())
	}

	fmt.Println(quiz)

	if err := database.Instance.Delete(&quiz).Error; err != nil {
		// TODO which status code to use
		return c.Status(http.StatusInternalServerError).JSON(err.Error())
	}

	return c.Status(http.StatusOK).SendString("Quiz deleted")
}
