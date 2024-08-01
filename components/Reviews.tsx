"use client";
import styles from "./styles/Reviews.module.scss";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import type { Review } from "@/types/StockList";

export default function Reviews() {
  const reviews: Review[] = [
    {
      user: "mandre",
      content: "Great stock list!",
    },
    {
      user: "zanesun",
      content:
        "Awesome list! Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus.",
    },
  ];
  const isOwner = false;
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
          />

          <div className={styles.right_align}>
            <Button
              variant="contained"
              endIcon={<SendRoundedIcon />}
              onClick={() => setReviewText("")}
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
                <p className={styles.user}>{review.user}</p>
                <p className={styles.content}>{review.content}</p>
              </div>
            </div>

            {isOwner && (
              <IconButton>
                <DeleteRoundedIcon sx={{ color: "darkred" }} />
              </IconButton>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
