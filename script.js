
let Job_list = [];                                                                  //creates global list of Jobs that ive applied to
let totalAmountCounter = 0;                                                         //global counter of jobs logged into system
const totalAmountLabel = document.getElementById("totalAppCount");                  //fetches HTML tag via ID and saves it 
const addButton = document.getElementById("addButton");                             //fetches button via ID and saves it

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//This function creates a new Job Object and saves it into the list. And increases the application counter and aswell as loads the currently added job object into the list. 
function createJobApplicationObject() {
  // Get the input field values
  const companyName = document.getElementById("company-name").value;
  const jobTitle = document.getElementById("job-title").value;
  const jobPostingLink = document.getElementById("job-posting-link").value;

  // Create a job object with default applicationState as "Unknown"
  const job = {
    companyName: companyName,
    jobTitle: jobTitle,
    jobPostingLink: jobPostingLink,
    applicationState: "Unknown", // Default state is "Unknown"
  };

  // Add the job object to the Job_list
  Job_list.push(job);

  // Increment the total applications counter
  totalAmountCounter += 1;

  // Update the total applications count
  totalAmountLabel.textContent = totalAmountCounter;

  // Update the list of applications
  loadJobApplications();

  // Clear input fields after submission
  document.getElementById("company-name").value = "";
  document.getElementById("job-title").value = "";
  document.getElementById("job-posting-link").value = "";
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Function to create a job card element
function createJobCard(job, index) {
  const JobCard = document.createElement("div");
  JobCard.classList.add("job-card-css");

  const i = document.createElement("p");
  i.classList.add("company-name-css");
  i.textContent = `${index + 1}`; // Show the job number (1-based index)
  JobCard.appendChild(i);

  const CompanyName = document.createElement("p");
  CompanyName.classList.add("company-name-css");
  CompanyName.textContent = `${job.companyName}`;
  JobCard.appendChild(CompanyName);

  const JobTitleName = document.createElement("p");
  JobTitleName.classList.add("job-title-name-css");
  JobTitleName.textContent = `${job.jobTitle}`;
  JobCard.appendChild(JobTitleName);

  const JobPostingLink = document.createElement("a");
  JobPostingLink.classList.add("job-posting-link-css");
  JobPostingLink.href = job.jobPostingLink;
  JobPostingLink.target = "_blank";
  JobPostingLink.textContent = `Job Listing`;
  JobCard.appendChild(JobPostingLink);

  const dateApplied = document.createElement("p");
  dateApplied.classList.add("date-applied-css");
  dateApplied.textContent = `Date Applied: ${new Date().toLocaleDateString()}`;
  JobCard.appendChild(dateApplied);

  // Create the delete button
  const deleteButton = document.createElement("button");
  deleteButton.classList.add("delete-button");
  deleteButton.textContent = "Delete";
  JobCard.appendChild(deleteButton);

  deleteButton.addEventListener("click", function () {
    Job_list.splice(index, 1); // Remove the job from the list
    totalAmountCounter -= 1; // Update the total amount when an item is deleted
    totalAmountLabel.textContent = totalAmountCounter;
    loadJobApplications(); // Re-render the list after deletion
  });

  return JobCard; // Return the job card element
}

// Function to render the entire list of jobs
function loadJobApplications() {
  const listContainer = document.querySelector(
    ".list-of-applications-container"
  );
  listContainer.innerHTML = ""; // Clear previous list before adding new ones

  Job_list.forEach((job, index) => {
    const JobCard = createJobCard(job, index); // Create the card for each job
    listContainer.appendChild(JobCard); // Add the card to the container
  });
}
totalAmountLabel.textContent = totalAmountCounter;
addButton.addEventListener("click", createJobApplicationObject);
