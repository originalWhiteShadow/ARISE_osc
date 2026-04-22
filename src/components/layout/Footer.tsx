import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full bg-[#f5f5f7] dark:bg-[#151516] text-apple-text text-[12px] pt-12 pb-8 px-4 md:px-8 border-t border-apple-border/20">
      <div className="max-w-[1000px] mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10 border-b border-apple-border/30 pb-10">
          <div>
            <h3 className="font-semibold text-apple-text mb-3">Platform</h3>
            <ul className="space-y-2 text-apple-text-muted">
              <li><Link href="/projects" className="hover:text-apple-text">Projects</Link></li>
              <li><Link href="/" className="hover:text-apple-text">Roadmap</Link></li>
              <li><Link href="/newsroom" className="hover:text-apple-text">Newsroom</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-apple-text mb-3">Community</h3>
            <ul className="space-y-2 text-apple-text-muted">
              <li><Link href="/about" className="hover:text-apple-text">About ARISE</Link></li>
              <li><Link href="/" className="hover:text-apple-text">Leadership</Link></li>
              <li><Link href="/" className="hover:text-apple-text">Sponsors</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-apple-text mb-3">Resources</h3>
            <ul className="space-y-2 text-apple-text-muted">
              <li><Link href="/learn" className="hover:text-apple-text">Learn</Link></li>
              <li><Link href="/" className="hover:text-apple-text">Guidelines</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-apple-text mb-3">Account</h3>
            <ul className="space-y-2 text-apple-text-muted">
              <li><Link href="?login=true" className="hover:text-apple-text">Sign In</Link></li>
              <li><Link href="/profile" className="hover:text-apple-text">Dashboard</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center text-apple-text-muted gap-4">
          <p>Copyright © {new Date().getFullYear()} ARISE Open Source Community. All rights reserved.</p>
          <div className="flex space-x-4">
            <Link href="/" className="hover:text-apple-text">Privacy Policy</Link>
            <span className="w-px bg-apple-border/50"></span>
            <Link href="/" className="hover:text-apple-text">Terms of Use</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
