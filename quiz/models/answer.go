package models

type Answer struct {
	ID   uint   `json:"id"`
	Text string `json:"text"`
	// belongs to Question
	QuestionID uint
}
