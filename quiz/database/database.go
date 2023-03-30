package database

import (
	"fmt"
	"quiz/models"

	"gorm.io/driver/mysql"

	"gorm.io/gorm"
)

// public singleton database instance
var Instance *gorm.DB

// connect to mysql database
func ConnectDb() {
	db, err := gorm.Open(mysql.Open("me:password@tcp(quiz-mysql-srv)/quiz?charset=utf8mb4&parseTime=True&loc=Local"), &gorm.Config{})
	if err != nil {
		panic("Could not connect to the database")
	}
	fmt.Println("Connected to mysql database")

	// create tables automatically
	db.AutoMigrate(&models.Quiz{}, &models.Question{}, &models.Answer{}, &models.User{})

	Instance = db
}
