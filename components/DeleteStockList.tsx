"use client";
import IconButton from "@mui/material/IconButton";
import DeleteRounded from "@mui/icons-material/DeleteRounded";
import { useRouter } from "next/navigation";

export default function DeleteStockList({
  owner,
  listName,
}: {
  owner: string;
  listName: string;
}) {
  const router = useRouter();

  function deleteStockList() {
    fetch(`/api/stocklists/${owner}/${listName}`, {
      method: "DELETE",
      credentials: "include",
    }).then((res) => {
      if (res.ok) {
        router.push("/home");
      }
    });
  }

  return (
    <IconButton
      sx={{ color: "darkred" }}
      title="Delete stock list"
      onClick={deleteStockList}
    >
      <DeleteRounded />
    </IconButton>
  );
}
