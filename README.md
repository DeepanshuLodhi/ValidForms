# Angular JSON Forms Project

A dynamic form application built with Angular 19 and Tailwind CSS. The application features dynamic form generation based on JSON configurations, custom form renderers, responsive design, and robust form validation.

## Features

- **Dynamic Form Generation**: Forms are dynamically generated based on JSON schema configurations
- **Multiple Form Layouts**: Includes two different form configurations (User Registration and Product Survey)
- **Custom Renderers**: Custom form element renderers for specialized input types
- **Responsive Design**: Fully responsive layout for both mobile and desktop views using Tailwind CSS
- **Real-time Validation**: Client-side validation with immediate feedback
- **Interactive Elements**: Includes dynamic elements that respond to user inputs (e.g., state selection affects form fields)

## Technologies Used

- Angular 19
- Tailwind CSS for styling
- JSON Forms library
- Reactive forms for validation

## Project Structure

- **Core Module**: Contains services and models for form configurations
- **Shared Module**: Reusable components and utilities
- **Form Builder Module**: Components for rendering and managing forms

## Getting Started

1. Clone the repository
```bash
git clone https://github.com/DeepanshuLodhi/ValidForms.git

Install dependencies

bashcd ValidForms
npm install

Run the development server

bashng serve

Open your browser and navigate to http://localhost:4200/

Form Types

User Registration Form: Collects personal information, address details (with Indian states and PIN codes), and account credentials
Product Survey Form: Collects user feedback about products with rating scales and conditional fields


You can add this file to your repository using:

```bash
code README.md
Then paste the content, save the file, and commit it to your repository:
bashgit add README.md
git commit -m "Add README file"
git push
