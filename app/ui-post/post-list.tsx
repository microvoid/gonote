"use client";

import {
  Table,
  TableBody,
  TableColumn,
  TableHeader,
  TableRow,
  TableCell,
  Chip,
  ChipProps,
} from "@nextui-org/react";
import Link from "next/link";
import { TrashIcon, OpenInNewWindowIcon } from "@radix-ui/react-icons";
import { Post } from "@prisma/client";
import { fromNow } from "../utils/time";

export type PostsProps = {
  posts: Post[];
};

export function Posts({ posts }: PostsProps) {
  const columns = [
    { name: "Title", uid: "title" },
    { name: "Public Status", uid: "publicStats" },
    { name: "Create At", uid: "createdAt" },
    { name: "ACTIONS", uid: "actions" },
  ];

  return (
    <Table
      aria-labelledby="posts"
      color="default"
      fullWidth
      radius="xl"
      shadow="lg"
    >
      <TableHeader columns={columns}>
        {column => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>

      <TableBody items={posts}>
        {item => (
          <TableRow key={item.id}>
            {columnKey => (
              <TableCell>{renderCell(item, columnKey as keyof Post)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

const renderCell = (post: Post, key: keyof Post | "actions") => {
  const statusColorMap: Record<Post["publicStats"], ChipProps["color"]> = {
    public: "success",
    private: "default",
  };

  switch (key) {
    case "title":
      return (
        <Link href={`${location.origin}/m/${post.slug}`} target="_blank">
          {post.title || "untitled"}
        </Link>
      );
    case "publicStats":
      return (
        <Chip
          className="capitalize"
          color={statusColorMap[post.publicStats]}
          size="sm"
          variant="flat"
        >
          {post.publicStats}
        </Chip>
      );
    case "createdAt":
      return fromNow(post.createdAt);
    case "actions":
      return (
        <div className="relative flex items-center gap-2">
          <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
            <Link href={`${location.origin}/m/${post.slug}`} target="_blank">
              <OpenInNewWindowIcon />
            </Link>
          </span>
          <span className="text-lg text-danger cursor-pointer active:opacity-50">
            <TrashIcon />
          </span>
        </div>
      );
    default:
      return null;
  }
};
