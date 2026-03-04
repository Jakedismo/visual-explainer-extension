# visual-explainer

**An agent skill that turns complex terminal output into styled HTML pages you actually want to read.**

ABOUTME: This project is an agent skill for Gemini CLI that generates beautiful, self-contained HTML pages for diagrams, diff reviews, plan reviews, and data tables. It also includes native AI image generation tools.

## Project Overview

`visual-explainer` replaces ASCII art and box-drawing tables with interactive HTML pages featuring real typography, dark/light themes, and Mermaid diagrams. It also provides built-in tools for generating images, icons, and patterns via the Gemini API.

### Main Technologies
- **HTML/CSS**: Vanilla implementation for self-contained portability.
- **Mermaid.js**: For flowcharts, sequence diagrams, and topology.
- **Chart.js**: For dashboards and metrics.
- **Node.js / MCP**: Native image generation tools using the Gemini API.

### Extension Structure
- `gemini-extension.json`: Manifest defining extension metadata and MCP server.
- `package.json`: Project metadata and Node.js dependencies.
- `commands/`: Custom slash commands (TOML format) available in Gemini CLI.
- `skills/`: Agent-activatable workflows (e.g., `visual-explainer/SKILL.md`).
- `references/`: Reference material the model reads before generating output.
- `templates/`: Reference HTML structures for different visualization types.

## Available Commands

### Visualization Commands
| Command | Description |
|---------|-------------|
| `/diff-review` | Visual diff review with architecture comparison. |
| `/fact-check` | Verify accuracy of a document against code. |
| `/generate-slides` | Generate a magazine-quality slide deck. |
| `/generate-visual-plan` | Generate a visual implementation plan. |
| `/generate-web-diagram` | Generate an HTML diagram for any topic. |
| `/plan-review` | Compare a plan against the codebase. |
| `/project-recap` | Mental model snapshot for context-switching. |
| `/visual-code-explain` | Explain the logic of a generated code file, mapping user intent to implementation. |
| `/code-archetype` | Generate a technical icon and structural card for a module or subsystem. |

### Image Generation Commands (Nanobanana Features)
| Command | Description |
|---------|-------------|
| `/visual-generate` | Generate high-quality images from prompts. |
| `/visual-icon` | Create app icons and UI elements. |
| `/visual-pattern` | Generate seamless, tileable textures. |
| `/visual-story` | Create a sequence of visually consistent images. |
| `/visual-diagram` | Generate professional diagrams as images. |

## Model Instructions (SKILL.md)

The core logic and design principles for this skill are located in `skills/visual-explainer/SKILL.md`. When using this extension, the model MUST:
1. **Prioritize Visuals**: Automatically render tables (4+ rows or 3+ columns) as HTML.
2. **Follow Aesthetic Guidelines**: Use Blueprint, Editorial, or Paper/ink styles. Avoid "AI slop" (Inter font, violet gradients, neon dashboards).
3. **Use Reference Material**: Always read files in `references/` and `templates/` before generating HTML.
4. **Native Image Generation**: Use built-in `generate_image`, `generate_icon`, or `generate_pattern` tools instead of external CLIs.
5. **Self-Contained Output**: Generate single-file HTML (inline CSS/JS) and save to `~/.agent/diagrams/`.

## Development Best Practices

- **Testing**: Use `gemini extensions link .` to test changes locally.
- **Portability**: Keep HTML self-contained. Use CDNs for large libraries (Mermaid, Chart.js) only when necessary.
- **Performance**: Minimize model turns by reading multiple reference files in parallel.