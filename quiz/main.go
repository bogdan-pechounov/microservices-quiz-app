package main

import (
	"log"

	"github.com/gofiber/fiber/v2"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

func main() {
	// Connect to database
	_, err := gorm.Open(mysql.Open("me:password@tcp(quiz-mysql-srv)/quiz?charset=utf8mb4&parseTime=True&loc=Local"), &gorm.Config{})

	if err != nil {
		// panic("could not connect to the dabase")
	}

	// App
	app := fiber.New()

	// Routes
	app.Get("/api/quiz", func(c *fiber.Ctx) error {
		return c.SendString("Hello, World!")
	})

	// Listen
	log.Fatal(app.Listen(":3000"))
}
