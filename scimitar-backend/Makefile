REPOSITORY ?= scimitar-backend
GIT_HASH ?= $(shell git log --format="%H" -n 1)
TAG ?= 4.12

help: ## Show this help message
	@echo "Available commands:"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-20s\033[0m %s\n", $$1, $$2}'

.PHONY: build-image
build-image: ## Build the Docker image
	@echo "🚀 Building the docker image ... "
	# docker rmi ${REGISTRY_URL}/${GIT_NAMESPACE}/${APPLICATION}-frontend:${VERSION}
	@docker build -f ./Dockerfile --tag ${REGISTRY_NAME}/${REPOSITORY}:${TAG} .

.PHONY: push-image
push-image: ## Push the image to the registry
	@echo "🚀 Push the docker image to the registry ..."
	@echo "📦 Rename and push the frontend image..."

	docker push ${REGISTRY_NAME}/${REPOSITORY}:${TAG}