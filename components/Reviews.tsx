"use client";
import styles from "./styles/Reviews.module.scss";
import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import type { Review } from "@/types/StockList";

export default function Reviews({
  ownerUsername,
  listName,
  isOwner,
}: {
  ownerUsername: string;
  listName: string;
  isOwner: boolean;
}) {
  const [reviews, setReviews] = useState<Review[]>([]);
  useEffect(() => {
    fetch(`/api/reviews?owner=${ownerUsername}&name=${listName}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          setReviews(data);
        });
      }
    });
  }, []);

  const [you, setYou] = useState("");
  useEffect(() => {
    fetch("/api/you", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          setYou(data.username);
        });
      }
    });
  }, []);

  const [editing, setEditing] = useState(false);

  function submitReview() {
    fetch("/api/reviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        owner: ownerUsername,
        name: listName,
        content: reviewText,
      }),
    }).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          location.reload();
        });
      }
    });
  }

  function editReview() {
    const edit = document.getElementById("edit") as HTMLInputElement;
    fetch("/api/reviews", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        owner: ownerUsername,
        name: listName,
        content: edit.value,
      }),
    }).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          location.reload();
        });
      }
    });
  }

  function deleteReview(reviewerUsername: string) {
    fetch("/api/reviews", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        ownerUsername,
        listName,
        reviewerUsername,
      }),
    }).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          location.reload();
        });
      }
    });
  }

  // const reviews: Review[] = [
  //   {
  //     user: "mandre",
  //     content: "Great stock list!",
  //   },
  //   {
  //     user: "zanesun",
  //     content:
  //       "Awesome list! Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus.",
  //   },
  // ];
  // const isOwner = false;
  const canReview = true;

  const [reviewText, setReviewText] = useState("");

  return (
    <div className={styles.container}>
      <h2 className={styles.section_title}>Reviews</h2>

      {!isOwner && canReview && (
        <>
          <TextField
            label="Your review"
            placeholder="Write a review..."
            multiline
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            variant="outlined"
            fullWidth
            maxRows={5}
            id="review"
          />

          <div className={styles.right_align}>
            <Button
              variant="contained"
              endIcon={<SendRoundedIcon />}
              onClick={() => submitReview()}
            >
              Submit
            </Button>
          </div>
        </>
      )}

      {/* TODO: Add edit & delete option for your own review (if you are not owner) */}
      <div className={styles.reviews}>
        {reviews.map((review, index) => (
          <div className={styles.review_container} key={index}>
            <div className={styles.review}>
              <AccountCircleRoundedIcon
                fontSize="large"
                sx={{ color: "gray" }}
              />
              <div className={styles.review_right}>
                <p className={styles.user}>
                  {review.user} {review.user === you && "(you)"}
                </p>
                {editing && review.user === you ? (
                  <div
                    style={{
                      display: "flex",
                      alignContent: "center",
                      gap: "20px",
                    }}
                  >
                    <TextField
                      multiline
                      variant="outlined"
                      maxRows={5}
                      defaultValue={review.content}
                      id="edit"
                    />
                    <Button variant="contained" onClick={() => editReview()}>
                      Edit
                    </Button>
                  </div>
                ) : (
                  <p className={styles.content}>{review.content}</p>
                )}
              </div>
            </div>

            {isOwner && (
              <IconButton
                sx={{ color: "darkred" }}
                onClick={() => deleteReview(review.user)}
              >
                <DeleteRoundedIcon />
              </IconButton>
            )}
            {review.user === you && !isOwner && (
              <div>
                <IconButton
                  sx={{ color: "darkblue", marginRight: "8px" }}
                  onClick={() => setEditing((old) => !old)}
                >
                  {!editing ? <EditRoundedIcon /> : <CloseRoundedIcon />}
                </IconButton>

                <IconButton
                  sx={{ color: "darkred" }}
                  onClick={() => deleteReview(review.user)}
                >
                  <DeleteRoundedIcon />
                </IconButton>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
