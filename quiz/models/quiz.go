package models

type Quiz struct {
	ID uint `json:"id"`

	// belongs to User
	UserID string `json:"userId" gorm:"size:30"`
	User   User   `json:"user"`

	Name        string `json:"name"`
	Description string `json:"description"`

	// has many Question
	Questions []Question `json:"questions" gorm:"constraint:OnDelete:CASCADE;"`
}
