import { type ReactNode, useEffect, useRef, useState } from 'react'
import { Tooltip, Typography, type TypographyProps } from '@mui/material'
import Zoom from '@mui/material/Zoom'
import { makeStyles } from 'tss-react/mui'

export type OverflowBoxProps = TypographyProps & {
  text: ReactNode
  displayLines?: number
  wordBreak?: 'anywhere' | 'break-word'
}

const useStyles = makeStyles<{
  displayLines: number
  wordBreak?: 'anywhere' | 'break-word'
}>()((_, { displayLines, wordBreak }) => ({
  lineEllipsis: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: displayLines,
    WebkitBoxOrient: 'vertical',
    overflowWrap: wordBreak,
  },
  popper: {
    top: '-16px !important',
  },
}))

const OverflowBox = ({
  text,
  className,
  displayLines = 1,
  wordBreak = 'break-word',
  ...typographyProps
}: OverflowBoxProps) => {
  const { classes, cx } = useStyles({ displayLines, wordBreak })
  const [isOverflowed, setIsOverflow] = useState(false)
  const textElementRef = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    textElementRef.current &&
      setIsOverflow(
        textElementRef.current.scrollHeight >
          textElementRef.current.clientHeight ||
          textElementRef.current.scrollWidth >
            textElementRef.current.clientWidth,
      )
  }, [])

  return (
    <Tooltip
      title={text}
      TransitionComponent={Zoom}
      enterDelay={500}
      enterNextDelay={500}
      disableInteractive
      disableHoverListener={!isOverflowed}
      PopperProps={{ className: classes.popper }}
    >
      <Typography
        ref={textElementRef}
        className={cx(classes.lineEllipsis, className)}
        {...typographyProps}
      >
        {text}
      </Typography>
    </Tooltip>
  )
}

export default OverflowBox
