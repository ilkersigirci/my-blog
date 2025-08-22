---
title: 'LangGraph OpenAI Serve'
description: 'OpenAI-Compatible API for LangGraph Workflows - Bridge the Gap Between Custom Agents and Standard APIs'
slug: "langgraph-openai-serve"
date: 2025-04-15
draft: false
tags:
  - "python"
  - "programming"
  - "langchain"
  - "fastapi"
categories:
  - "Work"
---

{{< link group="langgraph-openai-serve" >}}

In the rapidly evolving landscape of AI development, developers often face a common challenge: how to expose custom AI workflows and agents through standardized interfaces that can integrate seamlessly with existing tools and client libraries. Enter **LangGraph OpenAI Serve** - a powerful Python package that provides an OpenAI-compatible API for LangGraph instances, enabling developers to leverage their custom AI workflows while maintaining compatibility with the extensive OpenAI ecosystem.

## What is LangGraph OpenAI Serve?

LangGraph OpenAI Serve is a bridge between the flexibility of [LangGraph](https://github.com/langchain-ai/langgraph) workflows and the standardization of the OpenAI API. It allows developers to expose their custom LangGraph instances through an OpenAI-compatible REST API, making it possible to interact with custom AI agents using any OpenAI client library or tool.

## Key Features

### 🔌 **OpenAI API Compatibility**
The package implements a subset of the OpenAI API, focusing on the most commonly used endpoints:
- `/v1/models` - List available models (your LangGraph instances)
- `/v1/chat/completions` - Chat interactions with streaming support
- `/health` - Health check endpoint

### 🎯 **Multi-Graph Management**
Register multiple LangGraph workflows and map them to different model names, allowing you to:
- Serve different AI agents through a single API
- Switch between workflows by changing the model parameter
- Organize your agents by functionality or complexity

### ⚡ **Streaming Support**
Built-in support for both streaming and non-streaming responses:
- Real-time content delivery for better user experience
- Configurable streaming from specific nodes in your graph
- Compatible with OpenAI's streaming format

### 🏗️ **FastAPI Integration**
Seamlessly integrates with FastAPI applications:
- Use with existing FastAPI projects
- Automatic API documentation generation
- Built-in CORS support and middleware compatibility

## Architecture Overview

The system consists of several key components working together:

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   OpenAI Client │───▶│  FastAPI Server  │───▶│ Graph Registry  │
└─────────────────┘    └──────────────────┘    └─────────────────┘
                                │                        │
                                ▼                        ▼
                       ┌──────────────────┐    ┌─────────────────┐
                       │ Message Converter│    │ LangGraph       │
                       │ (OpenAI ↔ LC)    │    │ Workflows       │
                       └──────────────────┘    └─────────────────┘
```

1. **FastAPI Application**: Handles HTTP requests and responses
2. **Graph Registry**: Manages mapping between model names and LangGraph instances
3. **Message Converter**: Translates between OpenAI and LangChain message formats
4. **LangGraph Integration**: Executes workflows and handles streaming

## Getting Started

### Installation

```bash
# Using uv (recommended)
uv add langgraph-openai-serve

# Using pip
pip install langgraph-openai-serve
```

### Basic Usage

```python
from langgraph_openai_serve import LangchainOpenaiApiServe, GraphRegistry, GraphConfig
from your_graphs import simple_graph, advanced_graph

# Create a GraphRegistry
graph_registry = GraphRegistry(
    registry={
        "simple-chat": GraphConfig(
            graph=simple_graph, 
            streamable_node_names=["generate"]
        ),
        "advanced-agent": GraphConfig(
            graph=advanced_graph, 
            streamable_node_names=["reasoning", "response"]
        )
    }
)

# Initialize the server
graph_serve = LangchainOpenaiApiServe(graphs=graph_registry)

# Bind OpenAI-compatible endpoints
graph_serve.bind_openai_chat_completion(prefix="/v1")

# Run the server
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(graph_serve.app, host="0.0.0.0", port=8000)
```

### Using with OpenAI Clients

Once your server is running, you can interact with it using any OpenAI-compatible client:

```python
from openai import OpenAI

client = OpenAI(
    base_url="http://localhost:8000/v1",
    api_key="any-value"  # Authentication not enforced by default
)

# Use your custom graph as a "model"
response = client.chat.completions.create(
    model="advanced-agent",  # Your registered graph name
    messages=[
        {"role": "user", "content": "Analyze this business proposal..."}
    ],
    stream=True  # Streaming support
)

for chunk in response:
    if chunk.choices[0].delta.content:
        print(chunk.choices[0].delta.content, end="")
```

## Advanced Features

### Custom Graph Creation

The package supports sophisticated LangGraph workflows with multiple nodes, conditional routing, and tool calling:

```python
from langgraph import StateGraph, END
from langchain_core.messages import BaseMessage
from typing import Sequence, Annotated

class AgentState(BaseModel):
    messages: Annotated[Sequence[BaseMessage], add_messages]

def reasoning_node(state: AgentState):
    # Complex reasoning logic
    return {"messages": [processed_message]}

def response_node(state: AgentState):
    # Generate final response
    return {"messages": [final_response]}

# Build the workflow
workflow = StateGraph(AgentState)
workflow.add_node("reasoning", reasoning_node)
workflow.add_node("response", response_node)
workflow.add_edge("reasoning", "response")
workflow.add_edge("response", END)
workflow.set_entry_point("reasoning")

custom_graph = workflow.compile()
```

## Why LangGraph OpenAI Serve?

### 🎯 **Standardization Without Limitation**
- Use the familiar OpenAI API format while maintaining the flexibility of custom LangGraph workflows
- No need to rewrite client applications when switching from OpenAI to custom agents

### 🔧 **Developer Experience**
- Comprehensive documentation with tutorials and examples
- Type-safe Pydantic schemas for all API interactions
- Built-in error handling and validation

### 🚀 **Production Ready**
- FastAPI foundation provides excellent performance and scalability
- Docker support for containerized deployments
- Health check endpoints for monitoring

### 🌐 **Ecosystem Compatibility**
- Works with OpenAI Python SDK, Node.js SDK, and other compatible clients
- Direct HTTP request support (curl, Postman, etc.)
- Integration with existing OpenAI-compatible tools and platforms

## Use Cases

**Custom Chatbots**: Deploy domain-specific chatbots with specialized knowledge while maintaining OpenAI API compatibility.

**AI Agents**: Expose complex multi-step AI agents through a simple chat interface.

**Model Comparison**: A/B test different LangGraph workflows by exposing them as different "models."

**Legacy Integration**: Integrate custom AI workflows into existing applications that expect OpenAI API format.

**Development and Testing**: Use custom graphs during development while maintaining the option to switch to OpenAI models in production.

## Technical Highlights

### Modern Python Development
- Built with Python 3.11+ support
- Uses `uv` for dependency management and virtual environments
- Follows `src` layout for better project structure
- Type hints throughout for better IDE support

### Comprehensive Documentation
- Architecture explanations and design decisions
- Step-by-step tutorials for getting started
- How-to guides for advanced scenarios
- API reference documentation

### Quality Assurance
- Pre-commit hooks for code quality
- Comprehensive test suite
- Docker support for consistent environments
- MkDocs for beautiful documentation

## Getting Involved

LangGraph OpenAI Serve represents a significant step forward in making custom AI workflows more accessible and standardized. Whether you're building sophisticated AI agents, experimenting with new LangGraph patterns, or looking to integrate custom workflows into existing OpenAI-compatible infrastructure, this package provides the bridge you need.

The project is open source and welcomes contributions. Visit the [GitHub repository](https://github.com/ilkersigirci/langgraph-openai-serve) to explore the code, report issues, or contribute to the project.

## Conclusion

As AI development continues to evolve, the ability to create custom workflows while maintaining compatibility with established standards becomes increasingly valuable. LangGraph OpenAI Serve provides exactly this capability, enabling developers to harness the full power of LangGraph while leveraging the extensive ecosystem built around the OpenAI API.

Whether you're a researcher exploring new AI architectures, a developer building production AI applications, or a team looking to standardize your AI interfaces, LangGraph OpenAI Serve offers a robust, well-documented solution that bridges the gap between innovation and standardization.

*Ready to get started? Check out the [documentation](https://ilkersigirci.github.io/langgraph-openai-serve/) and begin exposing your LangGraph workflows through the familiar OpenAI API today.*
