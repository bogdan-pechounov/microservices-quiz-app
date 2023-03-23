package database

import (
	"quiz/models"

	"gorm.io/driver/mysql"

	"gorm.io/gorm"
)

type DbInstance struct {
	Db *gorm.DB
}

var Database DbInstance

func ConnectDb() {
	db, err := gorm.Open(mysql.Open("me:password@tcp(quiz-mysql-srv)/quiz?charset=utf8mb4&parseTime=True&loc=Local"), &gorm.Config{})
	if err != nil {
		panic("could not connect to the dabase")
	}

	db.AutoMigrate(&models.Quiz{})

	Database = DbInstance{Db: db}
}
