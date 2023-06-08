export const formatDurationToISO = (prepTime, cookTime) => {
    const prepTimeHours = parseInt(prepTime?.hours) || 0
    const prepTimeMinutes = parseInt(prepTime?.minutes) || 0
    const prepTimeISO = `PT${prepTimeHours}H${prepTimeMinutes}M`

    const cookTimeHours = parseInt(cookTime?.hours) || 0
    const cookTimeMinutes = parseInt(cookTime?.minutes) || 0
    const cookTimeISO = `PT${cookTimeHours}H${cookTimeMinutes}M`

    const totalHours = prepTimeHours + cookTimeHours
    const totalMinutes = prepTimeMinutes + cookTimeMinutes
    const totalTimeISO = `PT${totalHours}H${totalMinutes}M`

    return { prepTimeISO, cookTimeISO, totalTimeISO }
}
