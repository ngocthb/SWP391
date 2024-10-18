import React from "react";
import { StarFilled } from "@ant-design/icons";

import "./StylistFeedback.scss";

export default function StylistFeedback() {
  return (
    <div className="StylistFeedback">
      <div className="StylistFeedback__average-rating">
        <h2>Average Rating</h2>
        <div className="rating-content">
          <div className="rating-value">
            4.5
            <StarFilled className="rating-average-icon" />
          </div>
          <div>5k Reviews</div>
          <div className="rating-bars">
            <div className="rating-bar">
              <span>5</span>
              <div className="bar">
                <div className="bar-fill" style={{ width: "90%" }}></div>
              </div>
              <span>90%</span>
            </div>
            <div className="rating-bar">
              <span>4</span>
              <div className="bar">
                <div className="bar-fill" style={{ width: "60%" }}></div>
              </div>
              <span>60%</span>
            </div>
            <div className="rating-bar">
              <span>3</span>
              <div className="bar">
                <div className="bar-fill" style={{ width: "40%" }}></div>
              </div>
              <span>40%</span>
            </div>
            <div className="rating-bar">
              <span>2</span>
              <div className="bar">
                <div className="bar-fill" style={{ width: "30%" }}></div>
              </div>
              <span>30%</span>
            </div>
            <div className="rating-bar">
              <span>1</span>
              <div className="bar">
                <div className="bar-fill" style={{ width: "10%" }}></div>
              </div>
              <span>10%</span>
            </div>
          </div>
        </div>
      </div>

      <div className="StylistFeedback__customer-feedback">
        <h2>Customer Feedback</h2>
        <div className="lists-feedback">
          <div className="feedback-item">
            <img
              alt="Profile picture of Rachel Patel"
              height="50"
              src="https://storage.googleapis.com/a1aa/image/YOAO4k8ZxmK5KhmydViB5Qd7xLrMAxksWBgXsOdgFzvPD35E.jpg"
              width="50"
            />
            <div className="feedback-content">
              <div className="feedback-header">
                <div>
                  <h3>Rachel Patel</h3>
                  <span>October 9, 2023</span>
                </div>
                <div>
                  <StarFilled className="feedback-rating" />
                  <StarFilled className="feedback-rating" />
                  <StarFilled className="feedback-rating" />
                  <StarFilled className="feedback-rating" />
                  <StarFilled className="feedback-rating" />
                </div>
              </div>
              <div className="feedback-text">
                Couldn't resist buying this watch after seeing it online, and
                I'm so glad I did. It's even more stunning in person, and the
                build quality is exceptional. Will definitely be purchasing from
                this brand again!
              </div>
            </div>
          </div>

          <div className="feedback-item">
            <img
              alt="Profile picture of Christopher Lee"
              height="50"
              src="https://storage.googleapis.com/a1aa/image/JhDSNTa9YTb5AJJazDANE8CLTfbNDxL0xGmhtQexmkBANcnTA.jpg"
              width="50"
            />
            <div className="feedback-content">
              <div className="feedback-header">
                <div>
                  <h3>Christopher Lee</h3>
                  <span>June 25, 2023</span>
                </div>
                <div>
                  <StarFilled className="feedback-rating" />
                  <StarFilled className="feedback-rating" />
                  <StarFilled className="feedback-rating" />
                  <StarFilled className="feedback-rating" />
                  <StarFilled className="feedback-rating" />
                </div>
              </div>
              <div className="feedback-text">
                Really impressed with the quality and style of this watch. It's
                exactly what I was looking for – versatile, durable, and looks
                great with any outfit. Docked half a star because the clasp is a
                bit tricky to open, but otherwise, it's perfect!
              </div>
            </div>
          </div>

          <div className="feedback-item">
            <img
              alt="Profile picture of Brian Chen"
              height="50"
              src="https://storage.googleapis.com/a1aa/image/eOdBZ7Wv7BwuQK2hfC1mHo11ReqjeRAtvEhYqJlV0440zwdOB.jpg"
              width="50"
            />
            <div className="feedback-content">
              <div className="feedback-header">
                <div>
                  <h3>Brian Chen</h3>
                  <span>April 15, 2022</span>
                </div>
                <div>
                  <StarFilled className="feedback-rating" />
                  <StarFilled className="feedback-rating" />
                  <StarFilled className="feedback-rating" />
                  <StarFilled className="feedback-rating" />
                  <StarFilled className="feedback-rating" />
                </div>
              </div>
              <div className="feedback-text">
                While this watch has its merits, such as its sleek design and
                comfortable wear, I found the strap to be somewhat flimsy, and
                the clasp occasionally difficult to secure. Despite the minor
                drawbacks, it does keep accurate time.
              </div>
            </div>
          </div>
          <div className="feedback-item">
            <img
              alt="Profile picture of Brian Chen"
              height="50"
              src="https://storage.googleapis.com/a1aa/image/eOdBZ7Wv7BwuQK2hfC1mHo11ReqjeRAtvEhYqJlV0440zwdOB.jpg"
              width="50"
            />
            <div className="feedback-content">
              <div className="feedback-header">
                <div>
                  <h3>Brian Chen</h3>
                  <span>April 15, 2022</span>
                </div>
                <div>
                  <StarFilled className="feedback-rating" />
                  <StarFilled className="feedback-rating" />
                  <StarFilled className="feedback-rating" />
                  <StarFilled className="feedback-rating" />
                  <StarFilled className="feedback-rating" />
                </div>
              </div>
              <div className="feedback-text">
                While this watch has its merits, such as its sleek design and
                comfortable wear, I found the strap to be somewhat flimsy, and
                the clasp occasionally difficult to secure. Despite the minor
                drawbacks, it does keep accurate time.
              </div>
            </div>
          </div>
          <div className="feedback-item">
            <img
              alt="Profile picture of Brian Chen"
              height="50"
              src="https://storage.googleapis.com/a1aa/image/eOdBZ7Wv7BwuQK2hfC1mHo11ReqjeRAtvEhYqJlV0440zwdOB.jpg"
              width="50"
            />
            <div className="feedback-content">
              <div className="feedback-header">
                <div>
                  <h3>Brian Chen</h3>
                  <span>April 15, 2022</span>
                </div>
                <div>
                  <StarFilled className="feedback-rating" />
                  <StarFilled className="feedback-rating" />
                  <StarFilled className="feedback-rating" />
                  <StarFilled className="feedback-rating" />
                  <StarFilled className="feedback-rating" />
                </div>
              </div>
              <div className="feedback-text">
                While this watch has its merits, such as its sleek design and
                comfortable wear, I found the strap to be somewhat flimsy, and
                the clasp occasionally difficult to secure. Despite the minor
                drawbacks, it does keep accurate time.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
