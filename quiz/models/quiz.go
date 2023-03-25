package models

type Quiz struct {
	ID          uint   `json:"id"`
	UserID      string `json:"userId"`
	Author      string `json:"author"`
	Name        string `json:"name"`
	Description string `json:"description"`
	//has many relationship with Question
	Questions []Question `json:"questions"`
}
