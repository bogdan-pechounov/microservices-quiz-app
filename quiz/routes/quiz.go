package routes

import (
	"errors"
	"fmt"
	"net/http"
	"quiz/database"
	"quiz/models"

	"github.com/gofiber/fiber/v2"
)

func CreateQuiz(c *fiber.Ctx) error {
	var quiz models.Quiz

	if err := c.BodyParser(&quiz); err != nil {
		return c.Status(400).JSON(err.Error())
	}

	database.Database.Db.Create(&quiz)
	return c.Status(http.StatusCreated).JSON(quiz)
}

func GetQuizzes(c *fiber.Ctx) error {
	quizzes := []models.Quiz{}

	database.Database.Db.Find(&quizzes)

	return c.Status(http.StatusOK).JSON(quizzes)
}

func findQuiz(id int, quiz *models.Quiz) error {
	database.Database.Db.Find(&quiz, "id = ?", id)
	if quiz.Id == 0 {
		return errors.New("Quiz does not exist")
	}
	return nil
}

func GetQuiz(c *fiber.Ctx) error {
	id, err := c.ParamsInt("id")

	if err != nil {
		return c.Status(http.StatusBadRequest).JSON("Please ensuure that :id is an integer")
	}

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
	database.Database.Db.Save(&quiz)
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

	if err := database.Database.Db.Delete(&quiz).Error; err != nil {
		// TODO which status code to use
		return c.Status(http.StatusInternalServerError).JSON(err.Error())
	}

	return c.Status(http.StatusOK).SendString("Quiz deleted")
}
