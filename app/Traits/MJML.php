<?php

namespace App\Traits;

use Symfony\Component\Process\Process;
use Symfony\Component\Process\Exception\ProcessFailedException;
use Symfony\Component\Process\Exception\RuntimeException;
use Illuminate\Contracts\View\Factory as ViewFactory;
use Illuminate\Support\HtmlString;

trait MJML
{
    /**
     * Provided for semantic clarity, and so that your emails break if you forget
     * to use the trait.
     */
    public function mjml($view, $data = [])
    {
        return $this->view($view, $data);
    }

    protected function buildView()
    {
        $mjml = app(ViewFactory::class)->make($this->view, $this->viewData)->render();
        return [
            'html' => new HTMLString($this->mjmlToHtml($mjml)),
        ];
    }

    protected function mjmlToHtml($mjml)
    {
        $exe = config('mjml.path', base_path('node_modules/.bin/mjml'));
        $command = "$exe --stdin --stdout --config.minify=true";
        $timeout = config('mjml.timeout', 60);

        $process = new Process([$command]);
        $process->setInput($mjml);
        $process->setTimeout($timeout);

        try {
            $process->mustRun();
        } catch (RuntimeException $e) {
            // Process took too long
            throw $e;
        } catch (ProcessFailedException $e) {
            // Process returned an error result
            throw $e;
        } catch (\Exception $e) {
            // Not sure what happened
            throw $e;
        }

        return $process->getOutput();
    }
}
