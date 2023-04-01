package models

type Answer struct {
	ID        uint   `json:"id"`
	Text      string `json:"text"`
	IsCorrect bool   `json:"isCorrect"`
	// belongs to Question
	QuestionID uint
}
