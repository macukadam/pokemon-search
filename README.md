# Pokémon Search Component

A lightweight, customizable web component for searching Pokémon using the PokéAPI.
Easily embed this component in your projects to fetch and display Pokémon details.
Made for learning purposes.

## Features

- Fetches Pokémon details (name, type, height, weight, etc.) from the PokéAPI.
- Customizable text labels, button text, and styles via attributes and CSS variables.
- Works seamlessly with modern browsers.

### Via NPM

```bash
npm install pokemon-search-component
```

### Via CDN
Add this script to your HTML:
```html
<script src="https://unpkg.com/pokemon-search-component/dist/pokemon-search.min.js"></script>
```

### Usage

```html
<pokemon-search></pokemon-search>
```

### Customizing Attributes

```html
<pokemon-search
  title="Pokémon Finder"
  label="Enter Pokémon Name or ID"
  placeholder="e.g., pikachu or 25"
  button-text="Search"
></pokemon-search>
```

### Customizing Styles

```html
<style>
  pokemon-search {
    --title-color: #e74c3c;
    --button-bg-color: #3498db;
    --button-hover-bg-color: #2980b9;
  }
</style>
```

### Example:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Pokémon Search Example</title>
  <script src="https://unpkg.com/pokemon-search-component/dist/pokemon-search.min.js"></script>
</head>
<body>
  <pokemon-search
    title="Find Your Pokémon"
    label="Enter Name or ID"
    placeholder="e.g., charizard"
    button-text="Go"
  ></pokemon-search>
</body>
</html>
```
