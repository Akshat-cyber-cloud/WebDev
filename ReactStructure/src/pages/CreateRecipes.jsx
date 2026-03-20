import { nanoid } from "nanoid";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { recipecontext } from "../context/RecipeContext";

const CreateRecipes = () => {
    const {data, setData} = useContext(recipecontext);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const onSubmit = (recipe) => {
        recipe.id = nanoid();
        // console.log(recipe);

        // const copyData = [...data];
        // copyData.push(recipe);
        // setData(copyData);

        setData([...data, recipe]);

        reset();
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="max-w-md mx-auto mt-10 space-y-4"
        >
            {/* Image */}
            <input
                className="block w-full border-b outline-0 p-2"
                type="file"
                {...register("image", { required: "Image is required" })}
            />
            {errors.image && (
                <small className="text-red-500">{errors.image.message}</small>
            )}

            {/* Title */}
            <input
                className="block w-full border-b outline-0 p-2"
                type="text"
                placeholder="Recipe Title"
                {...register("title", { required: "Title is required" })}
            />
            {errors.title && (
                <small className="text-red-500">{errors.title.message}</small>
            )}

            {/* Description */}
            <textarea
                className="block w-full border-b outline-0 p-2"
                placeholder="Recipe Description"
                rows="4"
                {...register("description", {
                    required: "Description is required",
                    minLength: {
                        value: 10,
                        message: "Minimum 10 characters required",
                    },
                })}
            />
            {errors.description && (
                <small className="text-red-500">
                    {errors.description.message}
                </small>
            )}

            {/* Ingredients */}
            <textarea
                className="block w-full border-b outline-0 p-2"
                rows="3"
                placeholder="Ingredients (comma separated)"
                {...register("ingredients", {
                    required: "Ingredients are required",
                })}
            />
            {errors.ingredients && (
                <small className="text-red-500">
                    {errors.ingredients.message}
                </small>
            )}

            {/* Instructions */}
            <textarea
                className="block w-full border-b outline-0 p-2"
                rows="4"
                placeholder="Instructions (step by step)"
                {...register("instructions", {
                    required: "Instructions are required",
                })}
            />
            {errors.instructions && (
                <small className="text-red-500">
                    {errors.instructions.message}
                </small>
            )}


            {/* Submit */}
            <button
                type="submit"
                className="bg-black text-white px-4 py-2 rounded"
            >
                Create Recipe
            </button>
        </form>
    );
};

export default CreateRecipes;