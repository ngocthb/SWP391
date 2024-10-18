import "./StylistDashboard.scss";

export default function StylistDashboard() {
  return (
    <>
      <div class="dashboard">
        <div class="stats-container">
          <div class="stat-card">
            <div class="icon-box green">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                stroke-width="2"
              >
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            </div>
            <div>
              <div class="stat-number">6,680</div>
              <div class="stat-label">Total Employees</div>
            </div>
          </div>

          <div class="stat-card">
            <div class="icon-box purple">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                stroke-width="2"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
            <div>
              <div class="stat-number">3,640</div>
              <div class="stat-label">Male Employees</div>
            </div>
          </div>

          <div class="stat-card">
            <div class="icon-box orange">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                stroke-width="2"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
            <div>
              <div class="stat-number">3,040</div>
              <div class="stat-label">Female Employees</div>
            </div>
          </div>
        </div>

        <div class="details-container">
          <div class="profile-card">
            <div class="profile-section">
              <div class="profile-image"></div>
              <div class="profile-name">Mrinmoy Krishna</div>
              <div class="profile-title">UI UX Designer</div>
              <div class="profile-title">Team Leader</div>
            </div>
            <div class="profile-stats">
              <div class="stat-item">
                <div class="stat-value">12/31</div>
                <div class="stat-text">Attendance</div>
              </div>
              <div class="stat-item">
                <div class="stat-value">5/55</div>
                <div class="stat-text">Leaves</div>
              </div>
              <div class="stat-item">
                <div class="stat-value">0</div>
                <div class="stat-text">Awards</div>
              </div>
            </div>
          </div>

          <div class="stats-card">
            <div class="wfh-section">
              <div class="wfh-circle">
                <div class="wfh-icon"></div>
              </div>
              <div>70% of the employees are working from home today.</div>
            </div>

            <div class="chart-container">
              <div class="chart-item">
                <span class="chart-dot orange"></span>
                <span class="chart-label">User research</span>
                <span class="chart-value">20</span>
              </div>
              <div class="chart-item">
                <span class="chart-dot purple"></span>
                <span class="chart-label">Marketing</span>
                <span class="chart-value">12</span>
              </div>
              <div class="chart-item">
                <span class="chart-dot green"></span>
                <span class="chart-label">Product design</span>
                <span class="chart-value">8</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
