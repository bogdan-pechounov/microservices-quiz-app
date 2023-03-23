package middleware

import (
	"fmt"
	"net/http"
	"os"
	"quiz/models"

	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v5"
)

// Get user from jwt token in cookie
func DeserializeUser(c *fiber.Ctx) error {
	tokenString := c.Cookies("jwt")
	fmt.Println(tokenString)

	//check if cookie is present
	if tokenString == "" {
		return c.Status(http.StatusUnauthorized).SendString("Not logged in")
	}

	//parse jwt token
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		// Don't forget to validate the alg is what you expect:
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("Unexpected signing method: %v", token.Header["alg"])
		}

		// hmacSampleSecret is a []byte containing your secret, e.g. []byte("my_secret_key")
		return []byte(os.Getenv("JWT_SECRET")), nil
	})

	if err != nil {
		return c.Status(http.StatusUnauthorized).SendString("Invalid token")
	}

	fmt.Println(token)

	//claims
	if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
		//user
		var user models.User

		user.Id = fmt.Sprint(claims["id"])
		user.Username = fmt.Sprint(claims["username"])

		fmt.Println(user)

		c.Locals("user", user)
	} else {
		fmt.Println(err)
	}

	return c.Next()
}
