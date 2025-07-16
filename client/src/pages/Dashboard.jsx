import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchMyBlogs, deleteBlog } from "../features/blog/blogSlice"
import MyBlogsTable from "@/components/dashboard/MyBlogs"
export default function Dashboard() {
  const dispatch = useDispatch()
  const { myBlogs } = useSelector((state) => state.blog)

  useEffect(() => {
    dispatch(fetchMyBlogs())
  }, [dispatch])

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">My Blogs</h1>
      <MyBlogsTable
        data={myBlogs}
        onDelete={(id) => dispatch(deleteBlog(id))}
      />
    </div>
  )
}
