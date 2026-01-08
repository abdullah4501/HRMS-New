import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface Shortcut {
  id: string;
  label: string;
  enabled: boolean;
}

interface EditShortcutsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  shortcuts: Shortcut[];
  onToggleShortcut: (id: string) => void;
  onSave: () => void;
}

const EditShortcutsModal = ({
  open,
  onOpenChange,
  shortcuts,
  onToggleShortcut,
  onSave,
}: EditShortcutsModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-foreground">
            Edit Shortcuts
          </DialogTitle>
        </DialogHeader>
        
        <div className="py-4">
          <p className="text-muted-foreground text-sm mb-4">
            Select which shortcuts to display on your dashboard
          </p>
          
          <div className="space-y-3">
            {shortcuts.map((shortcut) => (
              <div
                key={shortcut.id}
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
              >
                <Checkbox
                  id={shortcut.id}
                  checked={shortcut.enabled}
                  onCheckedChange={() => onToggleShortcut(shortcut.id)}
                  className="data-[state=checked]:bg-secondary data-[state=checked]:border-secondary"
                />
                <Label
                  htmlFor={shortcut.id}
                  className="text-sm font-medium cursor-pointer flex-1"
                >
                  {shortcut.label}
                </Label>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button
            onClick={onSave}
            className="bg-secondary hover:bg-secondary/90"
          >
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditShortcutsModal;
