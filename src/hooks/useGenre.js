const useGenre = (selectedGenres) => {
    if (selectedGenres.length < 1) return '';
    const result = selectedGenres.map((item) => {
        return item.id;
    })
    return result.toString();
}

export default useGenre;