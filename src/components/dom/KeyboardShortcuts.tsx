import { useEffect } from 'react';

const KeyboardShortcuts = () => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd/Ctrl + K to scroll to top
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }

      // Cmd/Ctrl + 1 to scroll to projects
      if ((e.metaKey || e.ctrlKey) && e.key === '1') {
        e.preventDefault();
        document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
      }

      // Cmd/Ctrl + 2 to scroll to skills
      if ((e.metaKey || e.ctrlKey) && e.key === '2') {
        e.preventDefault();
        document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' });
      }

      // Cmd/Ctrl + 3 to scroll to contact
      if ((e.metaKey || e.ctrlKey) && e.key === '3') {
        e.preventDefault();
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return null; // This component doesn't render anything
};

export default KeyboardShortcuts;
