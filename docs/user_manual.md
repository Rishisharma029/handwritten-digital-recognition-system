# User Manual - Handwritten Digital Recognition System

## Table of Contents
1. [Getting Started](#getting-started)
2. [Uploading Images](#uploading-images)
3. [OCR Processing](#ocr-processing)
4. [Viewing Results](#viewing-results)
5. [Exporting Results](#exporting-results)
6. [History Management](#history-management)
7. [Settings](#settings)
8. [Troubleshooting](#troubleshooting)

## Getting Started

### System Requirements
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Internet connection
- Recommended: 50MB+ free disk space for caching models

### Accessing the Application
1. Open your web browser
2. Navigate to `http://localhost:3000` (or your configured URL)
3. You should see the home page with the upload interface

### User Interface Layout
- **Navbar**: Navigation links and logo
- **Sidebar**: Quick access to main features
- **Main Content Area**: Primary interface for your current task
- **Status Bar**: Real-time feedback on operations

## Uploading Images

### Supported Image Formats
- JPEG (.jpg, .jpeg)
- PNG (.png)
- Bitmap (.bmp)
- GIF (.gif)

### File Size Limits
- Maximum: 50 MB per image
- Recommended: < 5 MB for faster processing

### How to Upload

1. **Click the Upload Button**
   - Navigate to the Upload page
   - Click the upload box or drag files

2. **Select Image(s)**
   - Click "Choose Files" to browse
   - Or drag and drop images onto the upload area
   - Select one or more images

3. **Review Image**
   - Preview appears before upload
   - Verify image quality and content
   - Ensure text is clearly visible

4. **Submit Upload**
   - Click "Start OCR" or "Process Image"
   - Wait for confirmation

### Tips for Best Results
- Use high-quality images (300+ DPI recommended)
- Ensure good lighting and contrast
- Avoid blurry or rotated images
- Crop images to focus on text area
- Use black text on white background when possible

## OCR Processing

### Processing Stages

1. **Upload**: Image is received by the server
2. **Validation**: Image format and size are verified
3. **Preprocessing**: Image is enhanced for better recognition
   - Denoising: Removes image noise
   - Deskewing: Corrects image rotation
   - Contrast Enhancement: Improves text visibility
4. **Recognition**: TrOCR model processes the image
5. **Postprocessing**: Text is cleaned and formatted
6. **Scoring**: Confidence level is calculated

### Processing Time
- Average: 2-5 seconds per image
- May vary based on:
  - Image size and complexity
  - Server load
  - System specifications

### Monitoring Progress
- Real-time progress indicator shows current stage
- Status messages provide feedback
- Loader animation indicates active processing

## Viewing Results

### Results Page

The results page displays:
- **Original Image**: Processed image preview
- **Recognized Text**: Full OCR output
- **Confidence Score**: Trust level of results (0-100%)
- **Confidence Label**: Qualitative assessment (Very High, High, Medium, Low, Very Low)

### Understanding Confidence Scores

- **90-100%**: Very High confidence - Results likely accurate
- **75-90%**: High confidence - Results are reliable
- **50-75%**: Medium confidence - Manual review recommended
- **25-50%**: Low confidence - Results may contain errors
- **0-25%**: Very Low confidence - Results unreliable

### Text Quality Indicators

- **Green**: Excellent recognition
- **Blue**: Good recognition
- **Orange**: Fair recognition - review recommended
- **Red**: Poor recognition - manual correction needed

## Exporting Results

### Export Formats Available

1. **PDF (.pdf)**
   - Professional document format
   - Best for sharing and printing
   - Preserves formatting

2. **Word (.docx)**
   - Editable Microsoft Word format
   - Easy to modify and format
   - Compatible with most office tools

3. **Text (.txt)**
   - Plain text format
   - Universal compatibility
   - No formatting

4. **JSON (.json)**
   - Structured data format
   - Includes metadata
   - Useful for integration

### How to Export

1. **From Results Page**
   - Click "Export" button
   - Select desired format
   - File downloads automatically

2. **From History**
   - Click history card menu
   - Select "Export"
   - Choose format

3. **Batch Export**
   - From History page: Select multiple records
   - Click "Batch Export"
   - Choose format and download

### Export Options

Each export includes:
- Recognized text
- Timestamp
- Confidence score
- Original filename
- Processing metadata (format-dependent)

## History Management

### Accessing History

1. Click "History" in navigation
2. View all processed images
3. Sort and filter results

### History Features

- **Search**: Find records by filename or content
- **Sort**: Sort by date, confidence, or filename
- **Filter**: Filter by confidence level or date range
- **Preview**: Click card to preview results
- **Delete**: Remove unwanted records

### History Storage

- Records stored locally in database
- Persistent across sessions
- Automatic cleanup of old records (configurable)

### Exporting from History

1. Click the history card
2. Click "Export" button
3. Select format
4. File downloads with original filename

### Deleting History Records

1. Click history card
2. Click "Delete" button
3. Confirm deletion
4. Record is removed permanently

## Settings

### Application Settings

1. **OCR Settings**
   - Model selection
   - Confidence threshold
   - Processing mode

2. **Export Settings**
   - Default export format
   - File naming convention
   - Metadata inclusion

3. **Display Settings**
   - Theme (Light/Dark)
   - Language
   - Display density

4. **Advanced Settings**
   - API endpoint
   - Cache settings
   - Debug mode

### Changing Settings

1. Click "Settings" in navigation
2. Modify desired options
3. Click "Save"
4. Changes apply immediately

### Resetting to Defaults

1. Go to Settings
2. Click "Reset to Defaults"
3. Confirm action
4. All settings revert to default

## Troubleshooting

### Common Issues

#### Image Not Uploading

**Problem**: Upload fails or hangs

**Solutions**:
- Check file size (< 50 MB)
- Verify file format is supported
- Try different image file
- Clear browser cache
- Restart application

#### No Text Recognized

**Problem**: OCR returns empty result

**Solutions**:
- Ensure image contains text
- Improve image quality/contrast
- Try rotating image
- Crop to focus on text area
- Check image is not corrupted

#### Low Confidence Score

**Problem**: Results have low confidence

**Solutions**:
- Use higher quality image
- Improve lighting conditions
- Increase image resolution
- Ensure clear handwriting
- Avoid overlapping text

#### Slow Processing

**Problem**: OCR takes too long

**Solutions**:
- Reduce image size
- Use fewer images
- Check server status
- Verify internet connection
- Try again during off-peak hours

#### Download Issues

**Problem**: Exported file won't download

**Solutions**:
- Check download folder permissions
- Disable browser download blocking
- Try different export format
- Use browser download manager
- Try different browser

#### Connection Errors

**Problem**: Can't connect to server

**Solutions**:
- Verify server is running
- Check internet connection
- Clear browser cache and cookies
- Check firewall settings
- Restart browser

### Getting Help

- Check [API Documentation](./api_documentation.md)
- Review [Architecture Guide](./architecture.md)
- Check [Setup Instructions](./setup.md)
- Visit GitHub Issues
- Contact support team

### Performance Tips

1. **Optimize Images Before Upload**
   - Resize to appropriate dimensions
   - Enhance contrast if needed
   - Remove unnecessary content

2. **Browser Optimization**
   - Clear cache regularly
   - Update browser to latest version
   - Disable unnecessary extensions

3. **System Optimization**
   - Ensure sufficient disk space
   - Close other applications
   - Update operating system

4. **Network Optimization**
   - Use stable internet connection
   - Avoid upload during peak times
   - Consider wired connection

## Advanced Features

### Batch Processing

1. Select multiple images on Upload page
2. Click "Upload All"
3. Images process sequentially
4. View results for each image

### API Integration

For developers:
- REST API available at `/api`
- See API documentation for endpoints
- Use API key for authentication
- Integration examples provided

### Custom Models

Advanced users can:
- Load custom OCR models
- Configure preprocessing pipeline
- Adjust postprocessing rules
- See settings for configuration

## Best Practices

1. **Image Preparation**
   - Use high-quality source images
   - Ensure good contrast
   - Proper lighting conditions
   - Correct orientation

2. **Quality Assurance**
   - Review all results before use
   - Check confidence scores
   - Manual correction as needed
   - Verify important documents

3. **File Management**
   - Organize exports by date/type
   - Keep backup of originals
   - Regular history cleanup
   - Archive completed projects

4. **Performance**
   - Process during off-peak hours
   - Optimize image sizes
   - Use batch processing for multiple items
   - Monitor system resources

## Security

- **Data Privacy**: Uploads processed locally by default
- **Secure Connection**: Use HTTPS when available
- **Password Protection**: Optional authentication available
- **Data Retention**: Configure retention policies
- **Backup**: Regular backups of critical data

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| Ctrl+U | Go to Upload |
| Ctrl+H | Go to History |
| Ctrl+E | Export current result |
| Ctrl+S | Save settings |
| Ctrl+? | Open help/shortcuts |

## Frequently Asked Questions

**Q: How accurate is the OCR?**
A: Typically 95%+ accuracy on clear, well-formatted handwriting. Accuracy may vary with handwriting style and image quality.

**Q: Can I use the system offline?**
A: The web interface requires a server connection. Local installation available for offline use.

**Q: What's the maximum image size?**
A: Maximum 50 MB per image, though smaller images process faster.

**Q: Can I process multiple images at once?**
A: Yes, upload multiple files or use batch processing from history.

**Q: How long are results stored?**
A: Results are stored indefinitely by default. Configure retention policy in Settings.

**Q: Can I edit recognized text?**
A: Yes, export to DOCX or TXT format and edit in your preferred editor.

**Q: Is my data secure?**
A: Yes, with proper authentication and HTTPS connection enabled.

---

**Last Updated**: 2024
**Version**: 1.0.0
