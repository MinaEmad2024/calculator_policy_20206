
type Title ={
    title: string
}


const Data = ({title}: Title) => {


  return (
    <div className=" text-white text-center h-50 rounded-lg bg-blue-700 my-10 w-full">
          {title}
    </div>
  )


}

export default Data