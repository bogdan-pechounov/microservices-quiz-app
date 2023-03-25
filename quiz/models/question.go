package models

type Question struct {
	ID       uint   `json:"id"`
	Question string `json:"question"`
	//belongs to Quiz
	QuizID uint
}
