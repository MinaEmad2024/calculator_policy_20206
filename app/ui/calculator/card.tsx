


type CardProps = {

    title:string,
    parameter: string,
    sign: string,
}


const Card = ({title, parameter, sign}: CardProps) => {
// 1. Combine the parameter and sign to get the total string length
  const fullText = `${parameter} ${sign}`;
  const textLength = fullText.length;

  // 2. Determine font size class dynamically based on character count
  let fontSizeClass = "text-sm"; // Default size for short parameters
  if (textLength > 12) {
    fontSizeClass = "text-[10px]"; // Extra small size for massive text strings
  } else if (textLength > 8) {
    fontSizeClass = "text-xs"; // Medium small size for moderate strings
  }

  return (
    <div className="flex flex-row gap-1 border border-blue-200 rounded min-w-[120px] h-12 shadow-sm bg-white overflow-hidden">
      {/* Title section - uses flex-1 to fill space, but allows shrinking */}
      <div className={`text-white bg-blue-400 p-2 text-xs ${fontSizeClass} flex items-center flex-1 min-w-0 break-words`}>
        {title}
      </div>
      
      {/* Parameter section - scales text size dynamically based on length */}
      <div 
        className={`text-slate-800 bg-blue-100 p-2 font-bold flex items-center justify-center w-max whitespace-nowrap flex-shrink-0 transition-all ${fontSizeClass}`}
      >
        {fullText}
      </div>
    </div>
  )
}








export default Card