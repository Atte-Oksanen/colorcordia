import LoadingIcon from "../icons/LoadingIcon"

const LoadingComponent = () => {
  return (
    <div className="w-fit m-auto animate-spin">
      <LoadingIcon sizeClass={'h-20 w-20'}></LoadingIcon>
    </div>
  )
}

export default LoadingComponent