// import React from "react";

// export default function LoadingPage() {
//   return (
//     <div className="flex items-center justify-center min-h-screen bg-white dark:bg-gray-900">
//       <div className="flex flex-col items-center space-y-4">
//         {/* Animated Spinner */}
//         <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />

//         {/* Optional Loading Text */}
//         <p className="text-lg font-medium text-gray-700 dark:text-gray-200 animate-pulse">
//           Loading, please wait...
//         </p>
//       </div>
//     </div>
//   );
// }
import React from "react";

export default function LoadingPage() {
  return (
    <div className="flex items-center justify-center h-full bg-[transparent] dark:bg-gray-900 flex-1">
      {/* <!-- From Uiverse.io by Javierrocadev -->  */}
<div class="flex flex-row gap-2">
  <div class="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]"></div>
  <div class="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.3s]"></div>
  <div class="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]"></div>
</div>
    </div>
  );
}
