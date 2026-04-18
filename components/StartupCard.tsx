import { formatDate } from "@/lib/utils";
import { EyeIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { Post } from "@/sanity/types";
import { Author } from "@/sanity/types";
import { urlFor } from "@/sanity/lib/image";

export type StartupTypeCard = Omit<Post, "author"> & { author?: Author };

const StartupCard = ({ post }: { post: StartupTypeCard }) => {
  const {
    _createdAt,
    views,
    author,
    title,
    category,
    _id,
    mainImage,
    description,
  } = post;



  return (
    <li className="startup-card group">
      <div className="flex-between">
        <p className="startup-card_date">{formatDate(_createdAt)}</p>
        <div className="flex gap-1.5 items-center">
          <EyeIcon className="size-6 text-primary" />
          <span className="text-16-medium">{views}</span>
        </div>
      </div>
      <div className="flex-between mt-3 gap-5">
        <div className="flex-1">
          <div className="flex-between">
          <Link href={`/author/${author?._id}`}>
            <p className="text-16-medium line-clamp-1">{author?.name}</p>
          </Link>
          <Link href={`/?category=${encodeURIComponent(category || "")}`}>
          <p className="text-16-medium">{category}</p>
        </Link>
          </div>
          <Link href={`/blog/${post.slug?.current}`}>
            <h3 className="text-26-semibold line-clamp-3">{title}</h3>
          </Link>
        </div>
        <Link href={`/author/${author?._id}`}>
          <img
            src={author?.image ? urlFor(author.image).url() : "https://placehold.co/48x48"}
            alt={author?.name || "author avatar"}
            width={48}
            height={48}
            className="rounded-full"
          />
        </Link>
      </div>

      <Link href={`/blog/${post.slug?.current}`}>
        <p className="startup-card_desc">{description}</p>
        <img
          src={post.mainImage ? urlFor(post.mainImage).url() : "https://placehold.co/450x300"}
          alt={title || "article image"}
          className="startup-card_img"
          loading="lazy"
        />
      </Link>

      {/* <div className="flex-between gap-3 mt-5">
        
        <Button className="startup-card_btn" asChild>
          <Link href={`/blog/${post.slug?.current}`}>Read more</Link>
        </Button>
      </div> */}
    </li>
  );
};

export default StartupCard;
