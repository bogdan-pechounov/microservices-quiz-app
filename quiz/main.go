package main

import (
	"log"

	"quiz/database"
	"quiz/middleware"
	"quiz/routes"

	"github.com/gofiber/fiber/v2"
)

func setupRoutes(app *fiber.App) {
	//hello
	app.Get("/api/quiz/hello", func(c *fiber.Ctx) error {
		return c.SendString("Hello, World!")
	})

	// Unauthenticated routes
	app.Get("/api/quiz", routes.GetQuizzes)
	app.Get("/api/quiz/:id", routes.GetQuiz)

	// User middleware
	app.Use(middleware.DeserializeUser)

	// Restricted Routes
	app.Post("/api/quiz", routes.CreateQuiz)
	app.Put("/api/quiz/:id", routes.UpdateQuiz)
	app.Delete("/api/quiz/:id", routes.DeleteQuiz)
}

func main() {
	// Connect to database
	database.ConnectDb()

	// App
	app := fiber.New()

	// Routes
	setupRoutes(app)

	// Listen
	log.Fatal(app.Listen(":3000"))
}
