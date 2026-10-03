import { render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import Certificates from "./Certificates";

function renderPage() {
  return render(
    <MemoryRouter>
      <Certificates />
    </MemoryRouter>
  );
}

describe("Certificates page", () => {
  it("renders every certificate as a verifiable link", () => {
    renderPage();

    // Each card is an <a> whose href points at the real credential.
    const links = screen
      .getAllByRole("link")
      .filter(a =>
        /hackerrank|freecodecamp|credly/.test(a.getAttribute("href") ?? "")
      );

    expect(links).toHaveLength(10);
    links.forEach(link => {
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", expect.stringContaining("noopener"));
    });
  });

  it("derives the issuer label from the credential host", () => {
    renderPage();

    // HackerRank certs are the majority; Credly/freeCodeCamp also present.
    expect(screen.getAllByText("HackerRank").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Credly").length).toBe(2);
    expect(screen.getByText("freeCodeCamp")).toBeInTheDocument();
  });

  it("shows the newest certificate before older ones", () => {
    renderPage();
    const headings = screen.getAllByRole("heading", { level: 2 });
    // Sorted newest-first: August 2025 entry should come before the 2022 one.
    const names = headings.map(h => h.textContent);
    const newest = names.indexOf("Problem Solving (Intermediate)");
    const oldest = names.indexOf("IT Specialist - Python");
    expect(newest).toBeGreaterThanOrEqual(0);
    expect(oldest).toBeGreaterThan(newest);
  });

  it("links back home", () => {
    renderPage();
    const back = screen.getByRole("link", { name: /back home/i });
    expect(back).toHaveAttribute("href", "/");
    // Sanity: the back link lives in the top bar, not inside a cert card.
    expect(within(back).queryByText("Verify")).toBeNull();
  });
});
