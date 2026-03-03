USERNAME ?= $(REGISTRY_NAME)
REPOSITORY ?= scimitar-app
TAG ?= 4.12

help: ## Show this help message
	@echo "Available commands:"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-20s\033[0m %s\n", $$1, $$2}'

.PHONY: build-image
build-image: ## Build the Docker image
	@echo "🚀 Building the application ... "
	# docker rmi ${REGISTRY_URL}/${GIT_NAMESPACE}/${APPLICATION}-frontend:${VERSION}
	@docker build -f ./Dockerfile --tag ${USERNAME}/${REPOSITORY}:${TAG} .

.PHONY: push-image
push-image: ## Push frontend image to private registry
	@echo "🚀 Push existing images in to the registry ..."
	@echo "📦 Rename and push the frontend image..."

	docker push ${USERNAME}/${REPOSITORY}:${TAG}