import React from "react"
import cn from "classnames"

import "./Card.css"

export interface Props {
  title?: React.ReactNode
  isBordered?: boolean
  className?: string
  children?: React.ReactNode
  imgUrl?: string
  classButton?: string
  like?: boolean
  idCard?: string
}

export const Card: React.FC<Props> = ({
  title,
  isBordered = false,
  classButton,
  className,
  children,
  imgUrl,
  like,
  idCard,
}) => {
  // const onClick = (
  //   event: React.MouseEvent<HTMLButtonElement>,
  //   idCard: string
  // ): void => {}

  return (
    <div
      className={cn(
        "skit-card",
        isBordered && "skit-card__bordered",
        className
      )}
    >
      <img className="card__img" src={imgUrl} alt="#" />
      <h4 className="card__title">{title}</h4>
      {like && (
        <button
          type="button"
          className={classButton}
          // onClick={onClick}
        ></button>
      )}
      {/* {currentCard && <Equalizer></Equalizer>} */}
    </div>
  )
}
