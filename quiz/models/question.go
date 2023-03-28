package models

type Question struct {
	ID   uint   `json:"id"`
	Text string `json:"text"`
	// belongs to Quiz
	QuizID uint
	// has many Answer
	Answers []Answer `json:"answers" gorm:"constraint:OnDelete:CASCADE;"`
}
