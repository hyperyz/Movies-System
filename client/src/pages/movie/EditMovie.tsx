import React from "react";
import { useParams } from "react-router"


export default function EditMovie() {
    const params = useParams()
    return (
        <h1>
            修改电影{params.id}
        </h1 >
    )
}