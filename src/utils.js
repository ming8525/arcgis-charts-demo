import React from 'react'

export const setRef = (ref, value) => {
  if (typeof ref === 'function') {
    ref(value)
  } else if (ref != null) {
    ref.current = value
  }
}

/**
  * This will create a new function if the ref props change and are defined.
  */
export const useForkRef = (refA, refB) => {
  return React.useMemo(() => {
    if (refA == null && refB == null) {
      return null
    }
    return refValue => {
      setRef(refA, refValue)
      setRef(refB, refValue)
    }
  }, [refA, refB])
}