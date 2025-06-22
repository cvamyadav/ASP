use std::io;

// Student struct to hold student data
struct Student {
    name: String,
    total_marks: f32,
    num_subjects: u32,
}

impl Student {
    // Create a new Student instance
    fn new(name: String, total_marks: f32, num_subjects: u32) -> Self {
        Student {
            name,
            total_marks,
            num_subjects,
        }
    }

    // Calculate the average marks
    fn calculate_average(&self) -> f32 {
        if self.num_subjects == 0 {
            return 0.0; // Avoid division by zero
        }
        self.total_marks / self.num_subjects as f32
    }

    // Determine the grade based on average marks
    fn determine_grade(average: f32) -> String {
        match average {
            avg if avg >= 90.0 => "A".to_string(),
            avg if avg >= 75.0 => "B".to_string(),
            avg if avg >= 60.0 => "C".to_string(),
            _ => "D".to_string(),
        }
    }
}

fn main() {
    println!("Student Grade Calculator");
    println!("------------------------");

    // Get student details from user input
    let name = get_input("Enter student name: ");
    let total_marks: f32 = get_input("Enter total marks: ")
        .parse()
        .expect("Please enter a valid number for total marks");
    let num_subjects: u32 = get_input("Enter number of subjects: ")
        .parse()
        .expect("Please enter a valid integer for number of subjects");

    // Create student instance
    let student = Student::new(name, total_marks, num_subjects);

    // Calculate results
    let average = student.calculate_average();
    let grade = Student::determine_grade(average);

    // Display results
    println!("\nResults:");
    println!("Name: {}", student.name);
    println!("Total Marks: {}", student.total_marks);
    println!("Number of Subjects: {}", student.num_subjects);
    println!("Average: {:.2}", average);
    println!("Grade: {}", grade);
}

// Helper function to get user input
fn get_input(prompt: &str) -> String {
    println!("{}", prompt);
    let mut input = String::new();
    io::stdin()
        .read_line(&mut input)
        .expect("Failed to read input");
    input.trim().to_string()
}