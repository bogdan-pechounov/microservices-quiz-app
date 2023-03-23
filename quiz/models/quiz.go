package models

type Quiz struct {
	Id          uint   `json:"id" gorm:"primaryKey"`
	UserId      string `json:"userId"`
	Author      string `json:"author"`
	Name        string `json:"name"`
	Description string `json:"description"`
}
