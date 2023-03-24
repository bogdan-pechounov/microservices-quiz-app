## Build
FROM golang:1.20-buster AS build

WORKDIR /app

COPY go.mod ./
COPY go.sum ./
RUN go mod download

COPY . .

RUN go build -o /quiz

## Deploy
FROM gcr.io/distroless/base-debian10

COPY --from=build /quiz /quiz

EXPOSE 8080

USER nonroot:nonroot

ENTRYPOINT ["/quiz"]