import { Project, Testimonial } from '@/lib/types'
import { promises as fs } from 'fs'
import path from 'path'

// Function to read project file
const readProjectFile = async (filePath: string): Promise<Project> => {
  const projectData = await fs.readFile(filePath, 'utf8')
  return JSON.parse(projectData)
}

// Function to get all projects
const getAllProjects = async (): Promise<Project[]> => {
  try {
    const projectsPath = path.join(process.cwd(), '/content/projects')
    const projectsName = await fs.readdir(projectsPath)

    const projects = await Promise.all(
      projectsName.map(async (projectName) => {
        const filePath = path.join(projectsPath, projectName)
        const projectDetails = await readProjectFile(filePath)
        return projectDetails
      }),
    )

    // Sort projects by priority
    projects.sort((a, b) => a.priority - b.priority)

    return projects
  } catch (error) {
    // Handle errors
    console.error('Error:', error)
    return []
  }
}

const getAllRecommendations = async (): Promise<Testimonial[]> => {
  try {
    const recommendationsPath = path.join(process.cwd(), '/content/Testimonials')
    const recommendationFiles = await fs.readdir(recommendationsPath)

    const recommendations = await Promise.all(
      recommendationFiles.map(async (fileName) => {
        const filePath = path.join(recommendationsPath, fileName)
        const fileContents = await fs.readFile(filePath, 'utf8')
        return JSON.parse(fileContents)
      })
    )
    return recommendations
  } catch (error) {
    console.error('Error fetching recommendations:', error)
    return []
  }
}

// Update the export to use the new function name
export { getAllProjects, getAllRecommendations }
