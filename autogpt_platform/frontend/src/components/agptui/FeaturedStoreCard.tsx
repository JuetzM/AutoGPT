import * as React from "react";
import { StarIcon, StarFilledIcon } from "@radix-ui/react-icons";

interface FeaturedStoreCardProps {
  agentName: string;
  creatorName: string;
  description: string;
  runs: number;
  rating: number;
  onClick: () => void;
}

export const FeaturedStoreCard: React.FC<FeaturedStoreCardProps> = ({
  agentName,
  creatorName,
  description,
  runs,
  rating,
  onClick,
}) => {
  const [isHovered, setIsHovered] = React.useState(false);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  const renderStars = () => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const stars = [];

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<StarFilledIcon key={i} className="text-black" />);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<StarIcon key={i} className="text-black" />);
      } else {
        stars.push(<StarIcon key={i} className="text-black" />);
      }
    }

    return stars;
  };

  return (
    <div
      className={`inline-flex h-[595px] w-[667px] cursor-pointer flex-col items-start justify-start gap-10 rounded-xl border border-black/10 bg-[#f9f9f9] px-[25px] pb-[15px] pt-[35px] ${
        isHovered ? "shadow-lg" : ""
      } transition-shadow duration-300`}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="flex h-[124px] flex-col items-start justify-start gap-3.5 self-stretch">
        <div className="font-['PP Neue Montreal TT'] self-stretch text-[40px] font-medium leading-[43px] tracking-tight text-[#272727]">
          {agentName}
        </div>
        <div className="font-['PP Neue Montreal TT'] self-stretch text-xl font-normal tracking-tight text-[#878787]">
          by {creatorName}
        </div>
      </div>
      <div className="flex h-[381px] flex-col items-start justify-start gap-5 self-stretch">
        <div className="font-['PP Neue Montreal TT'] w-[540px] text-xl font-normal tracking-tight text-[#282828]">
          {description}
        </div>
        <div className="h-[245px] self-stretch rounded-xl bg-[#a8a8a8]" />
        <div className="flex items-center justify-between self-stretch">
          <div>
            <span className="font-['PP Neue Montreal TT'] text-xl font-medium tracking-tight text-[#272727]">
              {runs.toLocaleString()}+
            </span>
            <span className="font-['PP Neue Montreal TT'] text-xl font-normal tracking-tight text-[#272727]">
              {" "}
              runs
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="font-['PP Neue Montreal TT'] text-xl font-normal tracking-tight text-[#272727]">
              {rating.toFixed(1)}
            </div>
            <div className="flex items-center justify-start gap-px">
              {renderStars()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
