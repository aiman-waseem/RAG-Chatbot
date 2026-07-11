// export const chunkText = (
//     text,
//     chunkSize = 500,
//     overlap = 100
// ) => {

//     const chunks = [];

//     let start = 0;

//     while (start < text.length) {

//         const end = start + chunkSize;

//         chunks.push(
//             text.slice(start, end)
//         );

//         start += chunkSize - overlap;
//     }

//     return chunks;
// };

/**
 * Split a large paragraph into sentence-based chunks.
 */
function splitLargeParagraph(paragraph, maxChunkLength) {
  const sentences =
    paragraph.match(/[^.!?]+[.!?]+|[^.!?]+$/g) || [];

  const chunks = [];
  let currentChunk = "";

  for (const sentence of sentences) {
    if ((currentChunk + " " + sentence).length <= maxChunkLength) {
      currentChunk += (currentChunk ? " " : "") + sentence.trim();
    } else {
      if (currentChunk) {
        chunks.push(currentChunk);
      }

      currentChunk = sentence.trim();
    }
  }

  if (currentChunk) {
    chunks.push(currentChunk);
  }

  return chunks;
}

/**
 * Chunk text while trying to preserve paragraphs and sentences.
 */
export function chunkText(
  text,
  maxChunkLength = 500,
  overlap = 100
) {
  // Normalize line breaks
  text = text.replace(/\r\n/g, "\n").trim();

  // Split by empty lines (paragraphs)
  const paragraphs = text
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);

  const chunks = [];
  let currentChunk = "";

  for (const paragraph of paragraphs) {
    // Handle paragraphs that are larger than the chunk size
    if (paragraph.length > maxChunkLength) {
      // Save any chunk we're already building
      if (currentChunk) {
        chunks.push(currentChunk);
        currentChunk = "";
      }

      const smallerChunks = splitLargeParagraph(
        paragraph,
        maxChunkLength
      );

      chunks.push(...smallerChunks);

      continue;
    }

    // Try adding the paragraph to the current chunk
    if (
      (currentChunk + "\n\n" + paragraph).length <=
      maxChunkLength
    ) {
      currentChunk +=
        (currentChunk ? "\n\n" : "") + paragraph;
    } else {
      if (currentChunk) {
        chunks.push(currentChunk);
      }

      currentChunk = paragraph;
    }
  }

  if (currentChunk) {
    chunks.push(currentChunk);
  }

  // Add overlap between consecutive chunks
  if (overlap > 0) {
    const overlappedChunks = [];

    for (let i = 0; i < chunks.length; i++) {
      if (i === 0) {
        overlappedChunks.push(chunks[i]);
        continue;
      }

      const previousChunk = chunks[i - 1];

      const overlapText = previousChunk.slice(
        Math.max(0, previousChunk.length - overlap)
      );

      overlappedChunks.push(
        overlapText + "\n\n" + chunks[i]
      );
    }

    return overlappedChunks;
  }

  return chunks;
}