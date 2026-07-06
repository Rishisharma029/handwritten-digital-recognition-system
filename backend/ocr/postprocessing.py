"""Postprocessing utilities for OCR results."""
import re
import logging

try:
    from spellchecker import SpellChecker
    spell = SpellChecker()
    SPELL_AVAILABLE = True
except ImportError:
    spell = None
    SPELL_AVAILABLE = False


def clean_text(text: str) -> str:
    """
    Clean OCR output text.
    
    Args:
        text (str): Raw OCR output
        
    Returns:
        str: Cleaned text
    """
    if not text:
        return ""
    
    # Remove extra whitespace
    text = " ".join(text.split())
    
    # Remove special characters except common punctuation
    text = re.sub(r'[^\w\s.,!?;:\'-]', '', text)
    
    return text.strip()


def format_paragraphs(text: str, line_threshold: int = 80) -> str:
    """
    Format text into paragraphs based on line length.
    
    Args:
        text (str): Text to format
        line_threshold (int): Character threshold for paragraph break
        
    Returns:
        str: Formatted text with paragraphs
    """
    lines = text.split('\n')
    paragraphs = []
    current_paragraph = []
    
    for line in lines:
        if len(line) > line_threshold:
            if current_paragraph:
                paragraphs.append(' '.join(current_paragraph))
                current_paragraph = []
            paragraphs.append(line)
        else:
            current_paragraph.append(line)
    
    if current_paragraph:
        paragraphs.append(' '.join(current_paragraph))
    
    return '\n\n'.join(paragraphs)


def fix_common_ocr_errors(text: str) -> str:
    """
    Fix common OCR errors.
    
    Args:
        text (str): OCR output text
        
    Returns:
        str: Text with common errors fixed
    """
    # Common OCR substitutions
    corrections = {
        r'\b0\b': 'O',  # Zero to O
        r'\bl\b': 'I',  # lowercase L to uppercase I
        r'\brn\b': 'm',  # rn to m
        r'\bvv\b': 'w',  # vv to w
        r'\bcl\b': 'd',  # cl to d
        r'\bci\b': 'a',  # ci to a
    }
    
    for pattern, replacement in corrections.items():
        text = re.sub(pattern, replacement, text)
    
    return text


def normalize_whitespace(text: str) -> str:
    """Normalize whitespace in text."""
    # Remove multiple spaces
    text = re.sub(r' +', ' ', text)
    # Remove spaces before punctuation
    text = re.sub(r' +([.,!?;:])', r'\1', text)
    # Remove spaces around hyphens
    text = re.sub(r' +-+ ', '-', text)
    
    return text.strip()


def merge_hyphenated_words(text: str) -> str:
    """Merge words that were split by line breaks with hyphens."""
    text = re.sub(r'(\w+)-\s+(\w+)', r'\1\2', text)
    return text


def correct_spelling(text: str) -> str:
    """
    Correct spelling in OCR text.
    
    Args:
        text (str): OCR output text
        
    Returns:
        str: Text with spelling corrections
    """
    if not text:
        return ""

    if not SPELL_AVAILABLE:
        return text

    try:
        words = text.split()
        corrected_words = []
        
        for word in words:
            # Skip words with punctuation, numbers, very short words, or uppercase acronyms
            if len(word) < 3 or not word.isalpha() or word.isupper():
                corrected_words.append(word)
                continue
            
            # Find the best correction
            correction = spell.correction(word)
            if correction and correction != word:
                logger.debug(f"Spelling correction: {word} -> {correction}")
                corrected_words.append(correction)
            else:
                corrected_words.append(word)
        
        return ' '.join(corrected_words)
    except Exception as e:
        logger.warning(f"Spell correction failed: {e}")
        return text


def enhance_text_quality(text: str) -> str:
    """
    Apply all text enhancement steps.
    
    Args:
        text (str): Raw OCR text
        
    Returns:
        str: Enhanced text
    """
    if not text:
        return ""
    
    logger.info("Enhancing text quality...")
    
    # Step 1: Fix common OCR errors
    text = fix_common_ocr_errors(text)
    logger.debug("Fixed common OCR errors")
    
    # Step 2: Merge hyphenated words
    text = merge_hyphenated_words(text)
    logger.debug("Merged hyphenated words")
    
    # Step 3: Normalize whitespace
    text = normalize_whitespace(text)
    logger.debug("Normalized whitespace")
    
    # Step 4: Correct spelling
    text = correct_spelling(text)
    logger.debug("Corrected spelling")
    
    # Step 5: Clean final text
    text = clean_text(text)
    logger.debug("Cleaned final text")
    
    logger.info("Text enhancement complete")
    return text
