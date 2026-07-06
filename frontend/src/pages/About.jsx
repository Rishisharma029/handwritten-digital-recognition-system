import React from 'react';

/**
 * About page - displays information about the application
 */
const About = () => {
  return (
    <div className="about-page">
      <div className="about-container">
        <h1>About Handwritten Text Recognition</h1>

        <section className="about-section">
          <h2>Project Overview</h2>
          <p>
            The Handwritten Digital Recognition System is an advanced AI-powered solution
            designed to convert handwritten text from images into digital, editable text.
            Using state-of-the-art deep learning models, our system achieves high accuracy
            in recognizing various handwriting styles.
          </p>
        </section>

        <section className="about-section">
          <h2>Key Features</h2>
          <ul className="features-list">
            <li>🤖 Advanced TrOCR model for accurate handwriting recognition</li>
            <li>📸 Support for multiple image formats (JPG, PNG, BMP, GIF)</li>
            <li>💾 Multiple export options (PDF, DOCX, TXT, JSON)</li>
            <li>📊 Confidence scoring for result validation</li>
            <li>📜 Complete history of all OCR operations</li>
            <li>⚡ Fast processing with GPU support</li>
            <li>🔍 Preprocessing and postprocessing for optimal accuracy</li>
          </ul>
        </section>

        <section className="about-section">
          <h2>Technology Stack</h2>
          <div className="tech-stack">
            <div className="tech-category">
              <h3>Backend</h3>
              <ul>
                <li>FastAPI - Modern web framework</li>
                <li>PyTorch - Deep learning framework</li>
                <li>Transformers - Pre-trained models</li>
                <li>SQLAlchemy - Database ORM</li>
                <li>OpenCV - Image processing</li>
              </ul>
            </div>
            <div className="tech-category">
              <h3>Frontend</h3>
              <ul>
                <li>React - UI framework</li>
                <li>Vite - Build tool</li>
                <li>Axios - HTTP client</li>
                <li>CSS3 - Styling</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="about-section">
          <h2>How It Works</h2>
          <ol className="process-list">
            <li>
              <strong>Image Upload:</strong> Upload a handwritten text image in supported formats
            </li>
            <li>
              <strong>Preprocessing:</strong> Image is denoised, deskewed, and enhanced
            </li>
            <li>
              <strong>Recognition:</strong> TrOCR model recognizes text with high accuracy
            </li>
            <li>
              <strong>Postprocessing:</strong> Text is cleaned and formatted
            </li>
            <li>
              <strong>Confidence Scoring:</strong> Result confidence is calculated
            </li>
            <li>
              <strong>Export:</strong> Download results in your preferred format
            </li>
          </ol>
        </section>

        <section className="about-section">
          <h2>Model Information</h2>
          <div className="model-info">
            <p><strong>Model Name:</strong> microsoft/trocr-base-handwritten</p>
            <p><strong>Architecture:</strong> Vision Encoder-Decoder</p>
            <p><strong>Input Size:</strong> 384 x 384 pixels</p>
            <p><strong>Accuracy:</strong> ~95% on standard handwriting datasets</p>
            <p>
              The model is trained on multiple handwritten text datasets including IAM,
              CVL, and EMNIST, providing robust performance across various handwriting styles.
            </p>
          </div>
        </section>

        <section className="about-section">
          <h2>Supported Formats</h2>
          <div className="formats">
            <div className="format-group">
              <h3>Input Formats</h3>
              <ul>
                <li>JPEG (.jpg, .jpeg)</li>
                <li>PNG (.png)</li>
                <li>Bitmap (.bmp)</li>
                <li>GIF (.gif)</li>
              </ul>
            </div>
            <div className="format-group">
              <h3>Output Formats</h3>
              <ul>
                <li>PDF (.pdf)</li>
                <li>Word (.docx)</li>
                <li>Text (.txt)</li>
                <li>JSON (.json)</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="about-section">
          <h2>Contact & Support</h2>
          <p>
            For questions, feedback, or support, please reach out to our development team.
            Visit our GitHub repository for more information and to contribute.
          </p>
        </section>

        <footer className="about-footer">
          <p>&copy; 2024 Handwritten Digital Recognition System. All rights reserved.</p>
        </footer>
      </div>

      <style jsx>{`
        .about-page {
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 40px 20px;
        }

        .about-container {
          max-width: 900px;
          margin: 0 auto;
          background: white;
          border-radius: 12px;
          padding: 40px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
        }

        h1 {
          color: #333;
          text-align: center;
          margin-bottom: 40px;
          font-size: 2.5em;
        }

        .about-section {
          margin-bottom: 40px;
          border-bottom: 1px solid #eee;
          padding-bottom: 30px;
        }

        .about-section:last-child {
          border-bottom: none;
        }

        h2 {
          color: #667eea;
          margin-bottom: 15px;
          font-size: 1.8em;
        }

        h3 {
          color: #764ba2;
          margin-bottom: 10px;
        }

        p {
          color: #666;
          line-height: 1.8;
          margin-bottom: 10px;
        }

        ul, ol {
          color: #666;
          margin-left: 20px;
          margin-bottom: 10px;
        }

        li {
          margin-bottom: 8px;
          line-height: 1.6;
        }

        .features-list li {
          font-size: 1.05em;
        }

        .tech-stack {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 30px;
          margin-top: 15px;
        }

        .tech-category h3 {
          margin-bottom: 10px;
        }

        .formats {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 30px;
        }

        .format-group h3 {
          margin-bottom: 10px;
        }

        .model-info {
          background: #f5f5f5;
          padding: 20px;
          border-radius: 8px;
          border-left: 4px solid #667eea;
        }

        .about-footer {
          text-align: center;
          color: #999;
          font-size: 0.9em;
          margin-top: 40px;
          padding-top: 20px;
          border-top: 1px solid #eee;
        }

        @media (max-width: 768px) {
          .tech-stack,
          .formats {
            grid-template-columns: 1fr;
          }

          h1 {
            font-size: 2em;
          }

          .about-container {
            padding: 20px;
          }
        }
      `}</style>
    </div>
  );
};

export default About;
