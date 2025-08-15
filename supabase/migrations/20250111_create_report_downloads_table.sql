-- Create report_downloads table
CREATE TABLE IF NOT EXISTS report_downloads (
  id BIGSERIAL PRIMARY KEY,
  email TEXT NOT NULL,
  ip TEXT,
  user_agent TEXT,
  downloaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_report_downloads_email ON report_downloads(email);
CREATE INDEX IF NOT EXISTS idx_report_downloads_downloaded_at ON report_downloads(downloaded_at);
CREATE INDEX IF NOT EXISTS idx_report_downloads_ip ON report_downloads(ip);

-- Add Row Level Security (RLS)
ALTER TABLE report_downloads ENABLE ROW LEVEL SECURITY;

-- Create a policy for service role (your API)
CREATE POLICY "Service role can insert report downloads" ON report_downloads
  FOR INSERT
  TO service_role
  WITH CHECK (true);

CREATE POLICY "Service role can select report downloads" ON report_downloads
  FOR SELECT
  TO service_role
  USING (true);

-- Add comments for documentation
COMMENT ON TABLE report_downloads IS 'Tracks AI report downloads for analytics and lead generation';
COMMENT ON COLUMN report_downloads.email IS 'Email address of the person downloading the report';
COMMENT ON COLUMN report_downloads.ip IS 'IP address for rate limiting and analytics';
COMMENT ON COLUMN report_downloads.user_agent IS 'Browser/device information';
COMMENT ON COLUMN report_downloads.downloaded_at IS 'Timestamp when the report was downloaded';
